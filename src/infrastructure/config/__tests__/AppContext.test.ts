import { AppContext } from "../AppContext";

describe("AppContext", () => {
    test("When AppContext is assigned, then it should create an instance", () => {
        expect(new AppContext()).toBeTruthy();
    });
});