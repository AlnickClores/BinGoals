import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type GoalModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  inputText: string;
  setInputText: (text: string) => void;
  handleSaveGoal: () => void;
  isDone?: boolean;
  handleMarkAsDone?: () => void;
};

const GoalModal = ({
  modalVisible,
  setModalVisible,
  inputText,
  setInputText,
  handleSaveGoal,
  isDone = false,
  handleMarkAsDone,
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
          <Text style={styles.modalTitle}>Edit Goal</Text>

          <TextInput
            value={inputText}
            onChangeText={setInputText}
            style={styles.input}
            placeholder="Type your goal here..."
            multiline
            numberOfLines={3}
          />

          {handleMarkAsDone && inputText.trim() !== "" && (
            <TouchableOpacity
              style={[
                styles.doneButton,
                isDone ? styles.doneButtonActive : styles.doneButtonInactive,
              ]}
              onPress={handleMarkAsDone}
            >
              <Ionicons
                name={isDone ? "checkmark-circle" : "checkmark-circle-outline"}
                size={24}
                color={isDone ? "#ffffff" : "#22c55e"}
              />
              <Text
                style={[
                  styles.doneButtonText,
                  isDone
                    ? styles.doneButtonTextActive
                    : styles.doneButtonTextInactive,
                ]}
              >
                {isDone ? "Completed!" : "Mark as Done"}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveGoal}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
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
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    color: "#374151",
    backgroundColor: "#f8fafc",
    textAlignVertical: "top",
  },
  doneButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
  },
  doneButtonActive: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
  doneButtonInactive: {
    backgroundColor: "#ffffff",
    borderColor: "#22c55e",
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  doneButtonTextActive: {
    color: "#ffffff",
  },
  doneButtonTextInactive: {
    color: "#22c55e",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#6366f1",
    borderWidth: 1,
    borderColor: "#6366f1",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
});
