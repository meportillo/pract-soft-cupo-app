
import CreateRequest from '../components/request/CreateRequest'; 
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom/client';
import { setToken } from '../utils/auth';

test('Renderizado Create Request form', () => {
    setToken("Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQb3N0aW5zY3JpcGNpb25lcyBKV1RUb2tlbiIsImFsdW1ubyI6IjEyMzQxMjM0IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BTFVNTk8iXSwiaWF0IjoxNjU0ODMxNjM4LCJleHAiOjE2NTUwOTA4Mzh9.lLsJDziSIle_AjU8D4xAnlC9KLNXqTAbLmcLk3GxtqVYOk6HoTgJYichPKdo8-FBr0bOk2VweoPl5ItRYwAaZA")
    const root = ReactDOM.createRoot(document.createElement('div'));
    const component = root.render(<CreateRequest encabezado='Solicitud de cupo para materias'/>) 
});
