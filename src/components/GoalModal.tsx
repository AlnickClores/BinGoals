import { View, Text, StyleSheet, Modal, TextInput, Button } from "react-native";

type GoalModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  inputText: string;
  setInputText: (text: string) => void;
  handleSaveGoal: () => void;
};

const GoalModal = ({
  modalVisible,
  setModalVisible,
  inputText,
  setInputText,
  handleSaveGoal,
}: GoalModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Enter your goal:</Text>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            style={styles.input}
            placeholder="Type here..."
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Save" onPress={handleSaveGoal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    padding: 8,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
