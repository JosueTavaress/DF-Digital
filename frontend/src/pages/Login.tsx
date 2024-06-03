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

const LoginRegister: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handler = () => {
     if (isRegister) {
      console.log("registrar")
     } else {
      console.log("entrar");
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
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Digite seu email" />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type="password" placeholder="Digite sua senha" />
          </FormControl>
          {isRegister && (
            <FormControl>
              <FormLabel>Confirme sua Senha</FormLabel>
              <Input type="password" placeholder="Confirme sua senha" />
            </FormControl>
          )}
          <Button colorScheme="teal" size="lg" mt={4} onClick={ handler }>
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
