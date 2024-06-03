import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  VStack,
  Heading,
  Text,
  Center
} from "@chakra-ui/react";
import { saveToken } from '../utils/storage-browser';
import { useNavigate } from "react-router-dom";
import api from '../api/http-request';

const LoginRegister: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigator = useNavigate();

  const handler = async () => {
    if (isRegister) {
      if (confirmPassword === password && name && email) {
        const user = await api.createUser({
          name,
          password,
          email,
        });
        if (user.id) {
          const access = await api.login(email, password);
          if (access.tempToken) {
            saveToken(access.tempToken);
            navigator("/");
          }
        }
      }
    }
    if (!isRegister) {
      const access = await api.login(email, password);
      if (access.tempToken) {
        saveToken(access.tempToken);
        navigator("/");
      }
    }
  }

  return (
    <Center height="100vh">
      <Box
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={8}
        maxWidth="400px"
        width="full"
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="xl" textAlign="center">
            {isRegister ? 'Novo Usuário' : 'Login'}
          </Heading>
          {isRegister && (
            <FormControl>
              <FormLabel>Digite seu nome</FormLabel>
              <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Digite seu nome" />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite seu email" />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite sua senha" />
          </FormControl>
          {isRegister && (
            <FormControl>
              <FormLabel>Confirme sua Senha</FormLabel>
              <Input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirme sua senha" />
            </FormControl>
          )}
          <Button colorScheme="teal" size="lg" mt={4} onClick={handler}>
            {isRegister ? 'Cadastrar' : 'Entrar'}
          </Button>
          <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
            <Text mr={2}>{isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}</Text>
            <Switch
              isChecked={isRegister}
              onChange={() => setIsRegister(!isRegister)}
              colorScheme="teal"
            />
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}

export default LoginRegister;
