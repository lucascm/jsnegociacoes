export class HttpService {

    _handleErros(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url) {
        return fetch(url)
                .then(res => this._handleErros(res))
                .then(res => res.json());
    }

    /*get (url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onreadystatechange = () =>{
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }*/
}