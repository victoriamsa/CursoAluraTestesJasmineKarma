import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {
    let service: UniqueIdService = null;
    beforeEach(() =>{
        service = new UniqueIdService();
    })

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate  id when called with prefix`, () => {
        const id = service.generateUniqueIdWithPrefix('app');
        expect(id.startsWith('app-')).toBeTrue();
    });

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should not generate duplicate id when called multiple times`, () => {
        const ids = new Set();
        for (let i = 0; i < 50; i++) {
            ids.add(service.generateUniqueIdWithPrefix('app'));
        }
        expect(ids.size).toBe(50);
    });

    it (`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} should return the number of generatedIds when called`, () => {
        service.generateUniqueIdWithPrefix('app');
        service.generateUniqueIdWithPrefix('app');
        expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
    });

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should throw when caleed with empty string`, () => {
        const emptyValues = [null, undefined, '', '0', '1'];
        emptyValues.forEach(emptyValues => { 
            expect(() => service.generateUniqueIdWithPrefix(emptyValues)).withContext(`Empty Value: ${emptyValues}`).toThrow();
        });
    });
});