import { getCurrentOrphanageIndex, sleep, onlineOffline, getLocalStorage,updateLocalStorage } from "./utils.js";
import uuidv5 from "uuid/v5";
export let devHttpEndpoint =
  "https://g2gp355fq6.execute-api.eu-central-1.amazonaws.com/development/";
export let localHttpEndpoint = "http://127.0.0.1:5000/orphans/";
export let currentEndpoint = devHttpEndpoint;

export function pick(o, ...fields) {
  return fields.reduce((a, x) => {
    if (o.hasOwnProperty(x)) a[x] = o[x];
    return a;
  }, {});
}

export function getYears(startYear) {
  var currentYear = new Date().getFullYear(), years = [];
  startYear = startYear || 1990;
  while (startYear <= currentYear) {
    years.push({ value: startYear.toString(), label: startYear.toString() });
    startYear++;
  }
  return years;
}
export function newOrphanObject() {
  let uuid = uuidv5("https://orphans3.kaeme.org", uuidv5.DNS);
  return {
    id: uuid,
    uuid: uuid,
    created:true,
    residences: [
      { is_current_residence: 1, reported_by: "orphanage" },
      { reported_by: "orphanage" },
      { reported_by: "orphan" },
      { reported_by: "orphan" }
    ],
    relationships: [
      { reported_by: "orphanage", relationship_type: "mother" },
      { reported_by: "orphanage", relationship_type: "father" },
      { reported_by: "orphan", relationship_type: "mother" },
      { reported_by: "orphan", relationship_type: "father" }
    ],
    vaccines: [
      { vaccine: "Tuberculosis (BCG)" },
      { vaccine: "Polio" },
      { vaccine: "Measles" },
      { vaccine: "Tetanus (TT)" },
      { vaccine: "Pentavalent" },
      { vaccine: "Yellow Fever (YF)" },
      { vaccine: "Rotavirus" },
      { vaccine: "Pneumonia (PCV-xx)" }
    ]
  };
}
export function getRegions() {
  let cachedRegions = getLocalStorage("regions");

  if (cachedRegions) {
    return Promise.resolve(cachedRegions);
  } else {
    return get(currentEndpoint + "regions").then(data => {
      let sortedData = data.sort();
      updateLocalStorage("regions", sortedData);
      return sortedData;
    });
  }
}
export function getOrphanages() {
  let cachedOrphanages = getLocalStorage("orphanages");
  if (cachedOrphanages) {
    return Promise.resolve(cachedOrphanages);
  } else {
    return get(currentEndpoint + "orphanages").then(data => {
      let sortedData = data.sort();
      updateLocalStorage("orphanages", sortedData);
      return sortedData;
    });
  }
}
function orphanListOnline() {
  let cachedOrphans = getLocalStorage("orphans");

  if (cachedOrphans) {
    return Promise.resolve(cachedOrphans);
  } else {
    return get(currentEndpoint + "orphans/list").then(data => {
      updateLocalStorage("orphans", data);
      return data;
    });
  }
}
function orphanListOffline() {
  let orphanIdList = getLocalStorage("orphan-id-list") || [];
  let orphanages = getLocalStorage("orphanages") || [];
  let records = [];
  orphanIdList.map(id => {
    let orphan = getLocalStorage(id);
    console.log(orphan);
    let currentResidenceId = getCurrentOrphanageIndex(orphan.residences);
    let orphanageId = orphanages.findIndex(element => {
      return (
        element.value === orphan.residences[currentResidenceId].orphanage_id
      );
    });

    orphan.orphanage_name = orphanages[orphanageId].label;
    records.push(orphan);
    return id;
  });
  return Promise.resolve({ records: records });
}
export function getOrphanList() {
  return onlineOffline(orphanListOnline, orphanListOffline);
}
export function addToOrphanIdList(orphanId) {
  let localOrphanIdList = getLocalStorage("orphan-id-list") || [];
  localOrphanIdList.push(orphanId);
  updateLocalStorage("orphan-id-list", localOrphanIdList);
}
export function getOrphanData(childId, relatedTable) {
  return onlineOffline(
    () => {
      console.log('online');
      return get(currentEndpoint + "orphans/" + childId);
    },
    () => {
      console.log("offline");
      let orphan = getLocalStorage(childId) || {};
      return Promise.resolve(orphan);
    }
  );
}
async function putOrphanDataOffline(data) {
  updateLocalStorage(data.id, data);
  await sleep(500);
  return Promise.resolve(data);
}
export function putOrphanData(data) {
  return onlineOffline(
    () => {
      data.update = "remote";
      updateLocalStorage(data.id, data);
      return post(currentEndpoint + "orphans/" + data.id, data);
    },
    () => {
      data.update = "optimistic";
      return putOrphanDataOffline(data);
    }
  );
}
export function createOrphan(data) {
  return onlineOffline(
    () => {
      data.id = null;
      data.update = "remote";
      return post(currentEndpoint + "orphans/"+data.uuid, data);
    },
    () => {
      data.update = "optimistic";
      return putOrphanDataOffline(data);
    }
  );
}
export function post(url, data) {
  return fetch(url, { method: "post", body: JSON.stringify(data) })
    .then(response => {
      return handleResponse(response, url);
    })
    .catch(error => {
      return Promise.reject(new Error(error.message));
    });
}
export function get(url) {
  return fetch(url)
    .then(response => {
      return handleResponse(response, url);
    })
    .catch(error => {
      return Promise.reject(new Error(error.message));
    });
}

export function handleResponse(response, url) {
  if (response.ok) {
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      return response.json().catch(error => {
        return Promise.reject(new Error("Invalid JSON: " + error.message));
      });
    }

    if (contentType.includes("text/html")) {
      return response
        .text()
        .then(html => {
          return {
            page_type: "generic",
            html: html
          };
        })
        .catch(error => {
          return Promise.reject(new Error("HTML error: " + error.message));
        });
    }

    return Promise.reject(new Error("Invalid content type: " + contentType));
  }

  if (response.status === 404) {
    return Promise.reject(new Error("Page not found: " + url));
  }
  if (response.status === 500) {
    return Promise.reject(new Error("500 error: " + url));
  }
  return Promise.reject(new Error("HTTP error: " + response.status));
}
