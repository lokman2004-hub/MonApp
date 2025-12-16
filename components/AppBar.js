import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AppBar({ title }) {
  const { logout } = useContext(AuthContext);

  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#1976d2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
      }}
    >
      <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
        {title}
      </Text>

      <TouchableOpacity onPress={logout}>
        <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
