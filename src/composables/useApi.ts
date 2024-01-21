import useRequest from "./helpers/useRequest";
import useResponse from "./helpers/useResponse";

interface RequestValues {
  path?: string;
  params?: object;
  query?: object;
  body?: object;
}

export interface ApiResponse {
  status: string;
  isSuccess: boolean;
  data: any;
  errors?: object;
}

export default (
  requestConstructor: any,
  requestValues: RequestValues = {},
): Promise<ApiResponse> => {
  let response;
  const valuesKeys: any = requestValues ? Object.keys(requestValues) : {};

  // Shortcut for POST : If no 'params','query','body' keys in requestValues object, so it is 'body' object itself.
  if (
    valuesKeys.length &&
    !valuesKeys.some((key: any) =>
      ["path", "params", "query", "body"].includes(key),
    )
  ) {
    const body = { ...requestValues };
    requestValues = {};
    requestValues.body = body;
  }

  const request = useRequest(requestConstructor, requestValues);
  console.log(
    "►►►",
    request.method.toUpperCase(),
    request.path,
    requestConstructor,
    requestValues,
  );

  if (request)
    response = useResponse({
      method: request.method,
      path: request.path,
      exec: request.exec,
    });
  else throw new Error("Something went wront with your API request.");
  return response;
};
