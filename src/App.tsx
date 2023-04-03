import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
      "https://migrate-files-backend-production1.up.railway.app/RegisterFile",
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
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile">
          <Form.Label>File:</Form.Label>
          <Form.Control type="file" name="file" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p>{result}</p>
    </>
  );
};

export default App;
