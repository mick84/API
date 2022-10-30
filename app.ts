import { getStudents, makeRow } from "./functions.js";
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  hobby: string;
  age: number;
  city: string;
  capsule: number;
}
interface State {
  sortedBy: {
    field: keyof Student;
    ascending: number;
  };
  students: Student[];
}
class App {
  #table = document.getElementById("table")!;
  #mainRow = this.#table.querySelector(".row")!; //first row: column headers
  #sortOpts: (keyof Student)[] = [
    "id",
    "firstName",
    "lastName",
    "capsule",
    "age",
    "city",
    "gender",
    "hobby",
  ];
  #state: State = {
    sortedBy: {
      field: "id",
      ascending: 1,
    },
    students: [],
  };
  constructor() {
    window.addEventListener("load", async () => {
      this.#state = {
        sortedBy: JSON.parse(sessionStorage.getItem("sortedBy")!) || {
          field: this.#sortOpts[0],
          ascending: 1,
        },
        students: await getStudents(),
      };

      console.log(this.#state);
      for (const s of this.#state.students) {
        const row = makeRow(s);
        //make array of rows in the state, to sort and render them!
        this.#table.appendChild(row);
      }
    });
    this.#table.addEventListener("click", (e) => {
      const target = e.target as Element;
      switch (true) {
        case target.classList.contains("delete"):
          this.#deleteRow(target.parentElement!);
          break;
        case target.classList.contains("col-head"):
          const idx = [...this.#mainRow.children].indexOf(target);
          //console.log(this.#state.sortedBy.field, this.#sortOpts[idx]);
          const newOption: keyof Student = this.#sortOpts[idx];
          if (this.#state.sortedBy.field === newOption) {
            //sort by old key in reversed order
            console.log("old");
            this.#state.sortedBy.ascending *= -1;
            this.#state.students.sort((s1, s2) => {
              switch (typeof s1[newOption]) {
                case "number":
                  return (
                    this.#state.sortedBy.ascending *
                    (s1[newOption] - s2[newOption])
                  );
                case "string":
                  return (
                    this.#state.sortedBy.ascending *
                    (s1[newOption] < s2[newOption]
                      ? -1
                      : s1[newOption] > s2[newOption]
                      ? 1
                      : 0)
                  );
              }
            });
          } else {
            this.#state.sortedBy.field = newOption;

            //sort ascending by new key:
            console.log("new");
          }

          break;
      }
      sessionStorage.setItem("students", JSON.stringify(this.#state.students));
    });
  }
  #deleteRow(row: Element) {
    const rowIndex = [...this.#table.children].indexOf(row);
    console.log(rowIndex);
    //delete from state:
    this.#state.students.splice(rowIndex - 1, 1);
    sessionStorage.setItem("students", JSON.stringify(this.#state.students));
    //delete from UI:
    row.remove();
  }
}

new App();
