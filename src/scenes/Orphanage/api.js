import 'offline-js'
export let devHttpEndpoint = 'https://hz3rxzy9ug.execute-api.eu-central-1.amazonaws.com/development/';
export let devHttpEndpoint2 = 'https://g2gp355fq6.execute-api.eu-central-1.amazonaws.com/development/';

export let currentEndpoint = devHttpEndpoint;
export function updateLocalStorage(key,data){
    localStorage.setItem(key, JSON.stringify(data));
}
export function getLocalStorage(key){
	return JSON.parse(localStorage.getItem(key));
}
export function getOrphanageList(region_id){
  let url = currentEndpoint+'orphanages/list';
	return get(url);
}
export function getOrphanageData(orphanageId){
  
    return get(currentEndpoint+'orphanages/'+orphanageId)
  
}
export function putOrphanageData(data) {
  if(window.navigator.onLine){
    return post(currentEndpoint + "orphanages/" + data.id, data);
  }else{
    updateLocalStorage("currentOrphanage",data);
    return Promise.resolve(data);
  }
  
}
export function getRegions(){
  let cachedRegions = getLocalStorage('regions');

  if(cachedRegions){
    return Promise.resolve(cachedRegions);
  }else{
    return get(devHttpEndpoint2+'regions').then(data=>{let sortedData = data.sort(); /*updateLocalStorage('regions',sortedData);*/return sortedData;});
  }
}
export function post(url,data){
	return fetch(url, {method:'post', body: JSON.stringify(data)}).then(response => {
    return handleResponse(response,url);
  }).catch(error => {
    return Promise.reject(new Error(error.message));
  });
}
export function get(url) {
  return fetch(url).then(response => {
    return handleResponse(response,url);
  }).catch(error => {
    return Promise.reject(new Error(error.message));
  });
}

export function handleResponse(response,url){
  if (response.ok) {
      const contentType = response.headers.get('Content-Type') || '';

      if (contentType.includes('application/json')) {
        return response.json().catch(error => {
          return Promise.reject(new Error('Invalid JSON: ' + error.message));
        });
      }

      if (contentType.includes('text/html')) {
        return response.text().then(html => {
          return {
            page_type: 'generic',
            html: html
          };
        }).catch(error => {
          return Promise.reject(new Error('HTML error: ' + error.message));
        })
      }

      return Promise.reject(new Error('Invalid content type: ' + contentType));
    }

    if (response.status === 404) {
      return Promise.reject(new Error('Page not found: ' + url));
    }
    if(response.status === 500){
      return Promise.reject(new Error('500 error: '+url))
    }
    return Promise.reject(new Error('HTTP error: ' + response.status));
}