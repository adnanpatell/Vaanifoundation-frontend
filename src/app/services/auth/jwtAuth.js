import jwtAxios from "axios";

const jwtAuthAxios = jwtAxios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    // 'authorization':'yk11_',
    platform: "web",
  },
});

jwtAuthAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err, "err err err");
    if (err.response && err.response.data.type === "token-invalid") {
      //todo logout the user
      console.log(err.response, "Fall in exception ---- ");
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    jwtAuthAxios.defaults.headers.common["authorization"] = "" + token;
    sessionStorage.setItem("token", token);
  } else {
    delete jwtAuthAxios.defaults.headers.common["authorization"];
    sessionStorage.removeItem("token");
  }
};

export const getAuthToken = () => {
  return sessionStorage.getItem("token");
};

export function resetAuthToken() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");
}

function getResponse(response) {
  if (response && response.data) {
    if (response.status === 401 || response.status === 403) {
      resetAuthToken();
      if (
        ["login", "verify-email", "register", "verify-mobile"]?.some((p) =>
          window.location.pathname.indexOf(p)
        ) === -1
      ) {
        window.location.href = "/auth/login";
      }
    }
    if (response && response.status === 500) {
      return {
        status: 500,
        data: { message: "something went wrong ", error: {} },
      };
    }
    return {
      status: response.status,
      data: response.data,
    };
  } else {
    return {
      status: 500,
      data: {
        message: "something went wrong ",
      },
    };
  }
}

export const axiosPost = (config, callback, progressCallback) => {
  const { url, reqBody, header } = config;
  jwtAuthAxios
    .post(url, reqBody, {
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        if (typeof progressCallback === "function") {
          progressCallback(Math.ceil(progress));
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (typeof progressCallback === "function") {
          progressCallback(Math.ceil(0));
        }
      },
      // baseURL: baseUrl
    })
    .then((response) => {
      callback(getResponse(response));
    })
    .catch((err) => {
      callback(getResponse(err.response));
    });
};

export const axiosGet = (config, callback) => {
  jwtAuthAxios
    .get(config.url)
    .then((response) => {
      callback(getResponse(response));
    })
    .catch((err) => {
      callback(getResponse(err.response));
    });
};

export const axiosDelete = (config, callback) => {
  jwtAuthAxios
    .delete(config.url)
    .then((response) => {
      callback(getResponse(response));
    })
    .catch((err) => {
      callback(getResponse(err.response));
    });
};

//todo: define interceptors and other configuration like baseURL, headers etc. here
export default jwtAuthAxios;
