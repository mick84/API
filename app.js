var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _App_table, _App_sortOpts, _App_state;
import { getStudents, makeRow } from "./functions.js";
class App {
    constructor() {
        _App_table.set(this, document.getElementById("table"));
        _App_sortOpts.set(this, [
            "id",
            "name",
            "family",
            "capsule",
            "age",
            "city",
            "gender",
            "hobby",
        ]);
        _App_state.set(this, {
            sortedBy: {
                field: __classPrivateFieldGet(this, _App_sortOpts, "f")[0],
                ascending: true,
            },
            students: [],
        });
        window.addEventListener("load", async () => {
            //this.#state.sortedBy = JSON.parse(sessionStorage.getItem("sortedBy")!);
            __classPrivateFieldGet(this, _App_state, "f").students = await getStudents();
            for (const s of __classPrivateFieldGet(this, _App_state, "f").students) {
                const row = makeRow(s);
                __classPrivateFieldGet(this, _App_table, "f").appendChild(row);
            }
        });
        __classPrivateFieldGet(this, _App_table, "f").addEventListener("click", (e) => {
            var _a;
            const target = e.target;
            switch (true) {
                case target.classList.contains("delete"):
                    const row = target.parentElement;
                    const rowIndex = [...__classPrivateFieldGet(this, _App_table, "f").children].indexOf(row);
                    console.log(rowIndex);
                    //delete from state:
                    __classPrivateFieldGet(this, _App_state, "f").students.splice(rowIndex - 1, 1);
                    sessionStorage.setItem("students", JSON.stringify(__classPrivateFieldGet(this, _App_state, "f").students));
                    //delete from UI:
                    (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
                    break;
                case target.classList.contains("col-head"):
                    console.log(target.textContent);
                    break;
            }
        });
    }
}
_App_table = new WeakMap(), _App_sortOpts = new WeakMap(), _App_state = new WeakMap();
new App();
