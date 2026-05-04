import { Modal, View, Text, Pressable } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  description?: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  destructive?: boolean;
};

export function ConfirmDialog({
  visible,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  destructive = false,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 bg-black/40 justify-center items-center px-6"
        onPress={onCancel}
      >
        <Pressable
          className="bg-white rounded-2xl w-full max-w-sm p-6"
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="text-lg font-bold text-gray-900 mb-2">{title}</Text>
          {description && (
            <Text className="text-sm text-gray-600 leading-5 mb-6">
              {description}
            </Text>
          )}
          <View className="flex-row gap-2 justify-end">
            <Pressable
              onPress={onCancel}
              className="px-4 py-2 rounded-lg active:bg-gray-100"
            >
              <Text className="text-sm font-semibold text-gray-700">
                {cancelLabel}
              </Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              className={`px-4 py-2 rounded-lg ${
                destructive
                  ? "bg-red-600 active:bg-red-700"
                  : "bg-gray-900 active:bg-gray-800"
              }`}
            >
              <Text className="text-sm font-semibold text-white">
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
