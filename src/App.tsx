import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

interface FormData {
  file: File | null;
}

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    file: null,
  });

  const [result, setResult] = useState<String>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData.file);
    const formDataToSend = new FormData();

    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    const response = await fetch(
      "https://migrate-txt-api-production.up.railway.app/register-file",
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    if (response.ok) {
      const result = await response.json();
      setResult(result);
      console.log(result);
    } else {
      console.error(response.statusText);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormData({ ...formData, file });
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center mt-5">
        <h1>Formulário de arquivos .txt</h1>
        <Form
          onSubmit={handleSubmit}
          style={{ height: "20vh" }}
          className="d-flex align-items-center justify-content-center gap-4"
        >
          <Form.Group controlId="formFile">
            <Form.Label>Escolha um arquivo de extensão .txt:</Form.Label>
            <Form.Control type="file" name="file" onChange={handleFileChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
        {result && (
          <textarea className="w-50" style={{ minHeight: "15vh" }}>
            {result}
          </textarea>
        )}
      </Container>
    </>
  );
};

export default App;
