export const getInfoStudent = async(dni) => {

    const url = `http://localhost:8081/api/alumnos/${dni}`
    const rep = await fetch(url);
    const data = await rep.json();
    return data;
}