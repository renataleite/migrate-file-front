import React, { useState } from "react";
import { Form, Button, Container, FormControl } from "react-bootstrap";

interface FormData {
  file: File | null;
}

interface FileTextResponse {
  fileName: string;
  text: string;
}

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    file: null,
  });

  const [result, setResult] = useState<FileTextResponse>({
    fileName: "",
    text: "",
  });
  const [success, setSuccess] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }
    if (searchTerm) {
      formDataToSend.append("term", searchTerm);
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
      setSuccess(true);
    } else {
      console.error(response.statusText);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormData({ ...formData, file });
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center mt-5">
        <h1>
          {result.fileName ? result.fileName : "Fomulário de arquivos .txt"}
        </h1>
        <Form
          onSubmit={handleSubmit}
          className="d-flex align-items-end justify-content-center gap-4 mt-5"
        >
          <Form.Group controlId="formFile">
            <Form.Label className="fs-5 mb-2">
              Escolha um arquivo de extensão .txt:
            </Form.Label>
            <Form.Control type="file" name="file" onChange={handleFileChange} />
          </Form.Group>

          <Button variant="primary" type="submit" className="">
            Enviar
          </Button>
        </Form>
        {success && (
          <>
            <Form onSubmit={handleSubmit} className="d-flex w-100 gap-4 mt-5">
              <FormControl
                type="text"
                placeholder="Digite sua pesquisa"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Button variant="primary" type="submit">
                Pesquisar
              </Button>
            </Form>

            <pre
              className="w-100 mt-5"
              style={{ minHeight: "50vh" }}
              dangerouslySetInnerHTML={{ __html: result.text }}
            ></pre>
          </>
        )}
      </Container>
    </>
  );
};

export default App;
