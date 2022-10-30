export const makeRow = (s) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <p class="row-field id">${s.id}</p>
      <input class="row-field firstName" type="text" name="name" value=${s.firstName} disabled /><input
        class="row-field lastName"
        type="text"
        name="last" value=${s.lastName}
        disabled
      /><input
        class="row-field capsule"
        type="number"
        name="capsule" value=${s.capsule}
        disabled
      />
      <input
      class="row-field city"
      type="text"
      name="city" value=${s.city}
      disabled
    /><input
      class="row-field gender"
      type="text"
      name="gender" value=${s.gender}
      disabled
    /><input
      class="row-field hobby"
      type="text"
      name="hobby" value=${s.hobby}
      disabled
    />
      <input class="row-field" type="number" name="age" value=${s.age} disabled /><button class="row-field edit" type="button">Edit</button
      ><button class="row-field delete" type="submit">Delete</button>
    `;
    return row;
};
const makeURL = (...paths) => paths.join("/");
export const getStudents = async () => {
    const baseURL = "https://capsules7.herokuapp.com/api";
    // group:'one' or 'two'
    const dataString = sessionStorage.getItem(`students`);
    if (dataString) {
        console.log("data from session storage");
        return JSON.parse(dataString);
    }
    try {
        let promisesArr = [];
        for (const groupName of ["one", "two"]) {
            const url = makeURL(baseURL, "group", groupName);
            const prom = fetch(url).then((p) => p.json());
            promisesArr.push(prom);
        }
        const groups = await Promise.all(promisesArr);
        let students = [];
        for (const group of groups) {
            students.push(...group);
        }
        students.sort((a, b) => +a.id - +b.id);
        promisesArr = [];
        for (const s of students) {
            const url = makeURL(baseURL, "user", s.id);
            const prom = fetch(url).then((p) => p.json());
            promisesArr.push(prom);
        }
        students = await Promise.all(promisesArr);
        sessionStorage.setItem("students", JSON.stringify(students));
        return students;
    }
    catch (error) {
        console.error(error);
    }
};
