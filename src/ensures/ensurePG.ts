import { Pg } from "@modules/clients/dtos/ICreateClientDTO";

/* eslint-disable no-useless-escape */
export const ensurePG = (pg: Pg) => {
    if (!pg) {
        return true;
    }

    const pgRegex =
        /^(Cel|Ten-Cel|Cap|Maj|1º Ten|2º Ten|Asp|ST|1º Sgt|2º Sgt|3º Sgt|Cb|Sd EP|Sd EV)$/;

    return pgRegex.test(String(pg));
};
