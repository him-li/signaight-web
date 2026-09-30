"use client";
import {
  Button,
  Form,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
  FieldError,
} from "@heroui/react";
import { useState, type ChangeEvent, type FormEvent } from "react";

export default function ContactForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const handleMsgChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // contactSubmit(subject, message);//TODO: implement
    setSubject("");
    setMessage("");
  };

  return (
    <Form
      className="w-[82vw] h-full m-0 p-12 bg-white rounded-2xl shadow-lg border"
      onSubmit={handleSubmit}
    >
      <h2>Contact</h2>
      <Select isRequired onChange={() => handleSubjectChange} value={subject}>
        <Label>Select Subject...</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item key="option1" textValue="option1">
              Option 1
            </ListBox.Item>
            <ListBox.Item key="option2" textValue="option2">
              Option 2
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      <TextField isRequired>
        <Label>Message</Label>
        <TextArea
          value={message}
          onChange={() => handleMsgChange}
          placeholder="Type your message here"
        />
        <FieldError />
      </TextField>
      <Button type="submit" isDisabled={subject == "" || message == ""}>
        Send
      </Button>
    </Form>
  );
}
