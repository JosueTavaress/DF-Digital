import { useEffect, useState } from 'react';
import { IResponseUser } from '../api/http-request-interface';
import api from '../api/http-request';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  HStack,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface ITagCategory {
  id: number;
  name: string;
  color: string;
  description: string
}

type ExtendedResponseUser = IResponseUser & {
  password: string;
};

const Home: React.FC = () => {
  const [filteredUsers, setFilteredUsers] = useState<IResponseUser[]>([]);
  const [search, setSearch] = useState("");
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenTag, onOpen: onOpenTag, onClose: onCloseTag } = useDisclosure();
  const [currentEditUser, setCurrentEditUser] = useState<ExtendedResponseUser | IResponseUser | null>(null);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("");
  const [tagCategories, setTagCategories] = useState<ITagCategory[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const requestUsers = async () => {
      const response = await api.getUsers();
      setFilteredUsers(response);
    };

    const requestTags = async () => {
      const response = await api.getTags();
      setTagCategories(response);
    }

    requestUsers();
    requestTags();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers(filteredUsers.filter(user =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      ));
    }
  };

  const handleAddTag = async (userId: number, tag: ITagCategory) => {
    const user = filteredUsers.find((el) => el.id === userId);
    if (user?.tags.some((e) => e.id === tag.id)) return;
    const tags = user?.tags.map((el) => {
      return el.id
    })

    tags?.push(tag.id);
    const dataUpdate = {
      name: user?.name,
      email: user?.email,
      tags
    }

    await api.updateUser(userId, dataUpdate);
    const dataTag = filteredUsers.map((user) =>
      user.id === userId ? {
        ...user,
        tags: [...user.tags, tag]
      } : user
    )
    setFilteredUsers(dataTag);
  };

  const handleRemoveTag = async (userId: number, tag: ITagCategory) => {
    const user = filteredUsers.find((user) => user.id === userId);
    const newTags = user?.tags.filter((elementTag) => elementTag.id !== tag.id);
    const dataUpdate = {
      ...user,
      tags: newTags?.map((elementTag) => elementTag.id)
    }
    await api.updateUser(userId, dataUpdate);
    const dataUsers = filteredUsers.map((el) => {
      if (el.id === userId) {
        return {
          ...el,
          tags: el.tags.filter((tagElement) => tagElement.id !== tag.id)
        }
      }
      return el
    })
    setFilteredUsers(dataUsers);
  };

  const handleCreateUser = async (name: string, email: string, password: string) => {
    const newUser = await api.createUser({ name, email, password });
    const data = [...filteredUsers, { name, id: newUser.id, email, tags: [] }] as IResponseUser[]
    setFilteredUsers(data);
    onCloseCreate();
  };

  const handleEditUser = async (updatedUser: IResponseUser) => {
    await api.updateUser(updatedUser.id, {
      name: updatedUser.name,
      email: updatedUser.email,
      tags: updatedUser.tags.map((el) => el.id)
    });
    setFilteredUsers(filteredUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    onCloseEdit();
  }

  const handleDeleteUser = async (userId: number) => {
    await api.deleteUser(userId);
    setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
  };

  const handleAddNewTagCategory = async () => {
    const newTag = await api.createTag({
      color: newTagColor,
      name: newTagName,
      description: "custom tag"
    });

    setTagCategories([...tagCategories, newTag]);
    onCloseTag();
  };

  return (
    <Container maxW="container.lg" mt={8}>
      <FormControl>
        <FormLabel>Pesquisar Usuários</FormLabel>
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="Digite o nome do usuário"
        />
      </FormControl>
      <HStack spacing={4} mt={4}>
        <Button colorScheme="teal" onClick={onOpenCreate}>
          Novo Usuário
        </Button>
        <Button colorScheme="teal" onClick={onOpenTag}>
          Nova Categoria de Tag
        </Button>
      </HStack>
      <List spacing={3} mt={4}>
        {filteredUsers.map((user) => (
          <ListItem key={user.id}>
            <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
              <HStack justify="space-between">
                <VStack align="flex-start">
                  <Text fontSize="lg" fontWeight="bold">{user.name}</Text>
                  <Text>{user.email}</Text>
                  <Wrap>
                    {user.tags.map(tag => (
                      <WrapItem key={tag.id}>
                        <Tag colorScheme={tag.color} borderRadius="full" variant="solid">
                          <TagLabel>{tag.name}</TagLabel>
                          <TagCloseButton onClick={() => handleRemoveTag(user.id, tag)} />
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                  <Menu>
                    <MenuButton as={Button} size="sm" mt={2}>
                      Adicionar Tag
                    </MenuButton>
                    <MenuList>
                      {tagCategories.map(tag => (
                        <MenuItem key={tag.id} onClick={() => handleAddTag(user.id, tag)}>
                          {tag.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </VStack>
                <HStack>
                  <IconButton icon={<EditIcon />} aria-label="Editar" onClick={() => { setCurrentEditUser(user); onOpenEdit(); }} />
                  <IconButton icon={<DeleteIcon />} aria-label="Excluir" onClick={() => handleDeleteUser(user.id)} />
                </HStack>
              </HStack>
            </Box>
          </ListItem>
        ))}
      </List>
      <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Novo Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name">
              <FormLabel>Nome</FormLabel>
              <Input onChange={(e) => setName(e.target.value)} placeholder="Nome" />
            </FormControl>
            <FormControl id="email" mt={4}>
              <FormLabel>Email</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={() => { handleCreateUser(name, email, password) }}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={onCloseCreate}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name">
              <FormLabel>Nome</FormLabel>
              <Input
                value={currentEditUser?.name || ''}
                onChange={(e) => setCurrentEditUser({ ...currentEditUser!, name: e.target.value })}
                placeholder="Nome"
              />
            </FormControl>
            <FormControl id="email" mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={currentEditUser?.email || ''}
                onChange={(e) => setCurrentEditUser({ ...currentEditUser!, email: e.target.value })}
                placeholder="Email"
              />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input onChange={(e) => setCurrentEditUser({ ...currentEditUser!, password: e.target.value })} type="password" placeholder="Senha" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={() => currentEditUser && handleEditUser(currentEditUser)}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={onCloseEdit}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenTag} onClose={onCloseTag}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Nova Categoria de Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="tag-name">
              <FormLabel>Nome da Tag</FormLabel>
              <Input
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Digite o nome da tag"
              />
            </FormControl>
            <FormControl id="tag-color" mt={4}>
              <FormLabel>Cor da Tag</FormLabel>
              <Select
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                placeholder="Selecione a cor da tag"
              >
                <option value="blue">Azul</option>
                <option value="red">Vermelho</option>
                <option value="green">Verde</option>
                <option value="yellow">Amarelo</option>
                <option value="purple">Roxo</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAddNewTagCategory} colorScheme="teal" mr={3}>
              Adicionar
            </Button>
            <Button variant="ghost" onClick={onCloseTag}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Home;
