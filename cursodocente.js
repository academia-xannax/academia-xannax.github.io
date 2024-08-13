const courseList = [
	{
		id: 1,
		name: "Aritmetica",
		teacher: "Juan Pérez",
		description: "Curso de matemáticas avanzadas para estudiantes de bachillerato."
	},
	{
		id: 2,
		name: "Algebra",
		teacher: "María Rodríguez",
		description: "Curso de lengua y literatura para estudiantes de bachillerato."
	},
	{
		id: 3,
		name: "Trigonometria",
		teacher: "Carlos Gómez",
		description: "Curso de física básica para estudiantes de bachillerato."
	},
	{
		id: 4,
		name: "Geometria",
		teacher: "Ana López",
		description: "Curso de programación en Python para estudiantes de bachillerato."
	},
	{
		id: 5,
		name: "Competencia Linguistica",
		teacher: "juan medina",
		description: "Curso de historia universal para estudiantes de bachillerato."
	},
    {
		id: 6,
		name: "Quimica",
		teacher: "carlos mendoza",
		description: "Curso de historia universal para estudiantes de bachillerato."
	},
    {
		id: 7,
		name: "Fisica",
		teacher: "luis santillan ",
		description: "Curso de historia universal para estudiantes de bachillerato."
	},
    {
		id: 8,
		name: "Geografia",
		teacher: "mario pedrozo",
		description: "Curso de historia universal para estudiantes de bachillerato."
	},
    {
		id: 9,
		name: "Economia",
		teacher: "ulises villegas",
		description: "Curso de historia universal para estudiantes de bachillerato."
	}
];

const courseSearchInput = document.getElementById("course-search");
const courseSearchBtn = document.getElementById("course-search-btn");
const courseListElement = document.getElementById("course-list");

courseSearchBtn.addEventListener("click", () => {
	const searchTerm = courseSearchInput.value.trim();
	const filteredCourses = courseList.filter((course) => {
		return course.name.toLowerCase().includes(searchTerm.toLowerCase());
	});
	renderCourses(filteredCourses);
});

function renderCourses(courses) {
	courseListElement.innerHTML = "";
	courses.forEach((course) => {
		const courseCard = document.createElement("div");
		courseCard.className = "course-card";
		courseCard.innerHTML = `
			<h3>${course.name}</h3>
			<p>Profesor: ${course.teacher}</p>
			<p>Descripción: ${course.description}</p>
			<button>Más información</button>
		`;
		courseListElement.appendChild(courseCard);
	});
}