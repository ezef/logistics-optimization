describe('GetNearesWarehouse Helper', () => {
    let getNearesWarehouse;
    beforeEach(() => {
        console.log('HELPERS', sails.helpers);
        getNearesWarehouse = sails.helpers.getNearestWarehouse;
    });
    it('should get a routes list', () => {
        const response = getNearestWarehouse("La Plata");
        expect(response).toBeDefined();
    });
});