import { View, Text, FlatList, Button, TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  loadTodos,
  addTodoOffline,
  updateTodoOffline,
  deleteTodoOffline,
} from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  // Rafraîchir la liste depuis SQLite
  const refreshTodos = () => {
    setTodos(loadTodos());
  };

  // Ajouter ou modifier une tâche
  const handleAddOrUpdate = () => {
    if (!title.trim()) return;

    if (editingId) {
      updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      addTodoOffline(title);
    }

    setTitle("");
    refreshTodos();
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <>
      {/* Bouton thème */}
      <Button
        title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
        onPress={toggleTheme}
      />

      {/* Ajout / modification */}
      <View style={{ padding: 10 }}>
        <TextInput
          placeholder="Tâche hors ligne"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <Button
          title={editingId ? "✏️ Mettre à jour" : "➕ Ajouter hors ligne"}
          onPress={handleAddOrUpdate}
        />
      </View>

      {/* Liste des tâches */}
      {todos.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Aucune tâche disponible hors ligne
        </Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text>{item.title}</Text>

              <View style={{ flexDirection: "row" }}>
                <Button
                  title="✏️"
                  onPress={() => {
                    setTitle(item.title);
                    setEditingId(item.id);
                  }}
                />

                <Button
                  title="🗑️"
                  color="red"
                  onPress={() => {
                    deleteTodoOffline(item.id);
                    refreshTodos();
                  }}
                />
              </View>
            </View>
          )}
        />
      )}
    </>
  );
}
