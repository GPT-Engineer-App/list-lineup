import { useState } from "react";
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, Text } from "@chakra-ui/react";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: input, isCompleted: false }]);
      setInput("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };

  return (
    <Container centerContent maxW="container.md" padding="4">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Todo List
        </Text>
        <Input placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTodo()} />
        <Button colorScheme="blue" onClick={handleAddTodo}>
          Add Task
        </Button>
        <List spacing={3} width="100%">
          {todos.map((todo) => (
            <ListItem key={todo.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text as={todo.isCompleted ? "s" : ""}>{todo.text}</Text>
              <div>
                <IconButton icon={<FaCheckCircle />} aria-label="Complete Task" onClick={() => handleToggleComplete(todo.id)} colorScheme={todo.isCompleted ? "green" : "gray"} marginRight="2" />
                <IconButton icon={<FaTrash />} aria-label="Delete Task" onClick={() => handleDeleteTodo(todo.id)} colorScheme="red" />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
