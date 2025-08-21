import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type OptionsModalProps = {
  showOptionsModal: boolean;
  closeModal: () => void;
  handleDelete: () => void;
  cardName: string;
};

const OptionsModal = ({
  showOptionsModal,
  closeModal,
  handleDelete,
  cardName,
}: OptionsModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showOptionsModal}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.modalOverlay} onPress={closeModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{cardName}</Text>

          <TouchableOpacity style={styles.optionButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#ef4444" />
            <Text style={[styles.optionText, { color: "#ef4444" }]}>
              Delete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default OptionsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    width: "80%",
    maxWidth: 300,
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
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    color: "#374151",
  },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
  },
});
