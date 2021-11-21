import CuentasRepository from "../cuentasRepository";



describe("CuentasRepository", () => {
    const cuentasRepository = new CuentasRepository();

    test('When getCuentas is called, then cuentas should be returned', ()=>{
        const cuentas = cuentasRepository.getCuentas();
        expect(cuentas).toBeDefined();
    })

});