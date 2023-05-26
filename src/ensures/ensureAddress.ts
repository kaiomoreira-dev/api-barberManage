/* eslint-disable no-useless-escape */
export const ensureAddress = (address: string) => {
    try {
        if (!address) {
            return true;
        }
        // Validação do nome da rua
        const nameStreetRegex = /^[A-Za-z\s.,'-]+$/;
        nameStreetRegex.test(address.split(",")[0].trim());

        // Validação do número do endereço
        const numRegex = /^\d+$/;
        numRegex.test(address.split(",")[1].trim());

        // Validação do nome do bairro
        const nameDistrictRegex = /^[A-Za-z\s.,'-]+$/;
        nameDistrictRegex.test(address.split(",")[2].trim());

        // Validação do formato do CEP
        const cepRegex = /^\d{5}-\d{3}$/;
        cepRegex.test(address.split(",")[3].trim());

        // Validação do nome da cidade
        const nameCityRegex = /^[A-Za-z\s.,'-]+$/;
        nameCityRegex.test(address.split(",")[4].trim());

        return true;
    } catch (error) {
        return false;
    }
};
