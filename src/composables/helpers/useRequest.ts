import { AxiosInstance, AxiosRequestConfig } from "axios";

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

interface RequestBuilderParams {
  api: AxiosInstance;
  method: keyof typeof METHOD;
  path?: string | null;
  params?: object;
  query?: object;
  body?: object;
  config?: object;
}

export default (
  builderParams: RequestBuilderParams,
  valuesParams: Partial<RequestBuilderParams> = {},
): any => {
  try {
    return buildRequest(builderParams, valuesParams);
  } catch (e) {
    console.error(e);
    return false;
  }
};

function buildRequest(
  {
    api,
    method,
    path: path,
    params: paramsBuilder,
    query: queryBuilder,
    body: bodyBuilder,
    config: configBuilder,
  }: RequestBuilderParams,
  {
    path: forcedPath,
    params: paramsValue,
    query: queryValue,
    body: bodyValue,
    config: configRequest,
  }: Partial<RequestBuilderParams>,
) {
  let finalPath = forcedPath || path;
  method = method.toLowerCase();

  const config = { ...configBuilder, ...configRequest };

  if (!paramsBuilder && !queryBuilder && !bodyBuilder) {
    return requestBuilder(method, path, config);
  }

  //If procedural path configuration
  if (!forcedPath) {
    if (paramsBuilder && Object.keys(paramsBuilder).length) {
      if (typeof path === "string") {
        let params = path.split("/").filter((path) => path.includes(":"));
        params = params.map((param) => param.replace(":", ""));
        if (params.length !== Object.keys(paramsBuilder).length) {
          throw Error(
            `'params' field is not correctly implementing 'path' params declaration. [Ex1]`,
          );
        }

        const paramsBuilderKeys = Object.keys(paramsBuilder);
        for (const key of paramsBuilderKeys) {
          if (!params.includes(key)) {
            throw Error(
              `'params' field is not correctly implementing 'path' params declaration. [Ex2]`,
            );
          } else {
            if (paramsBuilder[key].required && paramsValue[key] === undefined) {
              throw Error(
                ` params '${key}' is required but not setted in request.`,
              );
            } else if (paramsValue[key]) {
              if (typeof paramsBuilder[key].format === "function") {
                paramsValue[key] = paramsBuilder[key].format(paramsValue[key]);
              }
              const validated = paramsBuilder[key].validators
                ? paramsBuilder[key].validators.some(
                    (func: any) => func(paramsValue[key]) === true,
                  )
                : true;
              if (validated) {
                finalPath = finalPath.replace(`:${key}`, paramsValue[key]);
              } else {
                throw Error(
                  ` params '${key}' is not valid. Required: ${paramsBuilder[key].validators.join(", ")}`,
                );
              }
            }
          }
        }
      }
    }

    if (queryBuilder && Object.keys(queryBuilder).length) {
      const queryBuilderKeys = Object.keys(queryBuilder);
      for (const key of queryBuilderKeys) {
        if (queryBuilder[key].required && queryValue[key] === undefined) {
          if (!queryBuilder[key].default)
            throw Error(
              ` query '${key}' is required but not setted in request.`,
            );
          else queryValue[key] = queryBuilder[key].default;
        } else if (queryValue[key]) {
          if (typeof queryBuilder[key].format === "function") {
            queryValue[key] = queryBuilder[key].format(queryValue[key]);
          }
          const validated = queryBuilder[key].validators
            ? queryBuilder[key].validators.some(
                (func: any) => func(queryValue[key]) === true,
              )
            : true;
          if (!validated) {
            throw Error(
              ` query '${key}' is not valid. Required: ${queryBuilder[key].validators.join(", ")}`,
            );
          }
        }
      }
      finalPath = finalPath + "?" + new URLSearchParams(queryValue).toString();
    }

    if (bodyBuilder && Object.keys(bodyBuilder).length) {
      const bodyBuilderKeys = Object.keys(bodyBuilder);
      for (const key of bodyBuilderKeys) {
        if (bodyBuilder[key].required && bodyValue[key] === undefined) {
          throw Error(` body '${key}' is required but not setted in request.`);
        } else if (bodyValue[key]) {
          if (typeof bodyBuilder[key].format === "function") {
            bodyValue[key] = bodyBuilder[key].format(bodyValue[key]);
          }
          const validated = bodyBuilder[key].validators
            ? bodyBuilder[key].validators.some(
                (func: any) => func(bodyValue[key]) === true,
              )
            : true;
          if (!validated) {
            throw Error(
              ` body '${key}' is not valid. Required: ${bodyBuilder[key].validators.join(", ")}`,
            );
          }
        }
      }
    }
  }
  //If scriptural forced path
  else {
    finalPath = forcedPath;
  }

  return requestBuilder(
    api,
    method as keyof typeof METHOD,
    finalPath,
    bodyValue,
    config,
  );
}

function requestBuilder(
  api: AxiosInstance,
  method: keyof typeof METHOD,
  pathValue: string,
  bodyValue = null,
  config: AxiosRequestConfig = {},
) {
  if (config.headers) {
    config.headers = {
      ...api.defaults.headers.common,
      ...api.defaults.headers[method],
      ...config.headers,
    };
  }
  // console.log('useRequest CONFIG',config);
  return {
    method: method,
    path: pathValue,
    body: JSON.stringify(bodyValue),
    exec: [METHOD.GET, METHOD.DELETE].includes(method)
      ? () => api[method](pathValue, config)
      : () => api[method](pathValue, bodyValue, config),
  };
}
