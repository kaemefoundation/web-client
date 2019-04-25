import {
  getCurrentOrphanageIndex,
  sleep,
  onlineOffline,
  getLocalStorage,
  updateLocalStorage,
  dropdownListSort
} from "./utils.js";
import uuidv4 from "uuid/v4";

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
export function reflect(promise) {
  return promise.then(
    (v) => {
      return { status: 'fulfilled', value: v };
    },
    (error) => {
      return { status: 'rejected', reason: error };
    }
  );
}
export async function getData(promises){
  
  const results = await Promise.all(promises.map(reflect));
  const successfulPromises = results.filter(p => p.status === 'fulfilled');

  return successfulPromises;
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
  let uuid = uuidv4();
  return {
    id: uuid,
    uuid: uuid,
    created: true,
    resettlement: "",
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
      let sortedData = data.sort(dropdownListSort);
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
      let sortedData = data.sort(dropdownListSort);
      updateLocalStorage("orphanages", sortedData);
      return sortedData;
    });
  }
}
export function getOrphanageStaff(orphanage_id){
  return get(currentEndpoint + "orphanage-staff/"+orphanage_id);
}
export function clearOrphanageList(){
  localStorage.removeItem("orphanages");
}
export function clearOrphanList(){
  console.log('clearing orphan list');
  localStorage.removeItem("orphans");
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
    let currentResidenceId = getCurrentOrphanageIndex(orphan.residences);
    if (currentResidenceId > -1) {
      let orphanageId = orphanages.findIndex(element => {
        return (
          element.value === orphan.residences[currentResidenceId].orphanage_id
        );
      });
      if (orphanageId > -1) {
        orphan.orphanage_name = orphanages[orphanageId].label;
      }
    }
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
  let idExists = localOrphanIdList.findIndex(element => {
    return element === orphanId;
  });
  if (idExists === -1) {
    localOrphanIdList.unshift(orphanId);

    updateLocalStorage("orphan-id-list", localOrphanIdList);
  }
}
export function addToOrphansList(data) {
  let cachedOrphans = getLocalStorage("orphans");
  let dataExists = cachedOrphans["records"].findIndex(element => {
    return element.id === data.id;
  });
  if (dataExists === -1) {
    cachedOrphans["records"].unshift(data);
    updateLocalStorage("orphans", cachedOrphans);
  } else {
    cachedOrphans["records"][dataExists] = data;
    updateLocalStorage("orphans", cachedOrphans);
  }
}
export function removeFromOrphanIdList(id) {
  let cachedOrphans = getLocalStorage("orphan-id-list");
  if (cachedOrphans) {
    let indexOfOrphan = cachedOrphans.indexOf(id);
    cachedOrphans.splice(indexOfOrphan, 1);
    updateLocalStorage("orphan-id-list", cachedOrphans);
  }
}
export function removeFromOrphansList(id) {
  let cachedOrphans = getLocalStorage("orphans");
  let dataExists = cachedOrphans["records"].findIndex(element => {
    return element.id === id;
  });
  if (dataExists > -1) {
    cachedOrphans["records"].splice(dataExists, 1);
    updateLocalStorage("orphans", cachedOrphans);
  }
}
export function updateLocalStorageOrphanData(orphan) {
  addToOrphanIdList(orphan.uuid);
  addToOrphansList(orphan);
  updateLocalStorage(orphan.uuid, orphan);
}
export function removeFromLocalStorageOrphanData(id) {
  removeFromOrphanIdList(id);
  removeFromOrphansList(id);
  localStorage.removeItem(id);
}
export function getRemoteOrphanData(orphanId) {
  return get(currentEndpoint + "orphans/" + orphanId);
}
export function getLocalStorageOrphanData(orphanId) {
  return getLocalStorage(orphanId);
}
export function getOrphanData(orphanId, relatedTable) {
  let localOrphanData = getLocalStorageOrphanData(orphanId);
  return onlineOffline(
    () => {
      if (localOrphanData) {
        //if the orphan was created offline, need to upload data
        if (localOrphanData.created) {
          return createOrphan(localOrphanData);
          //components/FormSections/FormContainer.js will display "confirm changes" screen
          //if there are optimistic updates, load locally stored orphan data
        } else if (localOrphanData.update === "optimistic") {
          return Promise.resolve(localOrphanData);
        } else {
          return getRemoteOrphanData(orphanId);
        }
      } else {
        return getRemoteOrphanData(orphanId);
      }
    },
    () => {
      return Promise.resolve(localOrphanData);
    }
  );
}
async function putOrphanDataOffline(data) {
  updateLocalStorageOrphanData(data);
  await sleep(500);
  return Promise.resolve(data);
}
export function putOrphanDataRemote(data) {
  return post(currentEndpoint + "orphans/" + data.id, data);
}
export function putOrphanData(data) {
  return onlineOffline(
    () => {
      data.update = "remote";
      updateLocalStorageOrphanData(data);
      return putOrphanDataRemote(data);
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
      if (data.id) {
        removeFromLocalStorageOrphanData(data.id);
      }

      delete data.id;

      return post(
        currentEndpoint + "orphans/" + data.uuid,
        data
      ).then(returnedData => {
        returnedData.update = "remote";
        updateLocalStorageOrphanData(returnedData);
        return Promise.resolve(returnedData);
      });
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
