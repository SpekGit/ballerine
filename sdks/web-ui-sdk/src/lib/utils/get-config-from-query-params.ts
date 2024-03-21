/**
 * @description Gets config-specific query params as an object
 */
type QueryParamsConfigType = {
  flowName: string | undefined;
  clientId: string | undefined;
  id: string | undefined;
  token: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  language: string | undefined;
  type: string | undefined;
};

export const getConfigFromQueryParams = (): QueryParamsConfigType => {
  const {
    b_uid,
    b_cid,
    b_t,
    b_fn,
    b_ln,
    b_fid,
    b_ph,
    b_em,
    b_lang,
    b_eut,
  } = Object.fromEntries(new URLSearchParams(window.location.search));

  const queryParamsConfig: QueryParamsConfigType = {
    flowName: b_fid,
    clientId: b_cid,
    id: b_uid,
    token: b_t,
    firstName: b_fn,
    lastName: b_ln,
    phone: b_ph,
    email: b_em,
    language: b_lang,
    type: b_eut,
  };

  return Object.entries(queryParamsConfig).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    acc[key as keyof QueryParamsConfigType] = value;

    return acc;
  }, {} as QueryParamsConfigType);
};
