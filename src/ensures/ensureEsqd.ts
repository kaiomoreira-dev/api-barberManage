import { Esqd } from "@modules/clients/dtos/ICreateClientDTO";

/* eslint-disable no-useless-escape */
export const ensureEsqd = (esqd: Esqd) => {
    if (!esqd) {
        return true;
    }

    const esqdRegex = /^(1º|2º|3º) Esqd$|^Esqd C Ap$|^EM$/;

    return esqdRegex.test(String(esqd));
};
