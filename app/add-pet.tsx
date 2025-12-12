import { createPet, CreatePetData } from '@/api/pets';
import { Header } from '@/components/header';
import { HeaderBackButton } from '@/components/header-back-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddPetScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthdate, setBirthdate] = useState('');
  const [loading, setLoading] = useState(false);

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          backgroundColor: colors.cardBackground,
          borderRadius: 12,
          padding: 16,
          fontSize: 16,
          color: colors.text,
          borderWidth: 1,
          borderColor: colors.borderLight,
          marginBottom: 16,
        },
        label: {
          fontSize: 14,
          fontWeight: '600',
          color: colors.text,
          marginBottom: 8,
        },
        button: {
          backgroundColor: colors.primary,
          borderRadius: 12,
          padding: 16,
          alignItems: 'center',
          marginTop: 8,
        },
        buttonText: {
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '600',
        },
        buttonDisabled: {
          opacity: 0.5,
        },
        genderContainer: {
          flexDirection: 'row',
          gap: 12,
          marginBottom: 16,
        },
        genderButton: {
          flex: 1,
          padding: 16,
          borderRadius: 12,
          borderWidth: 2,
          alignItems: 'center',
        },
        genderButtonActive: {
          borderColor: colors.primary,
          backgroundColor: colors.primary + '20',
        },
        genderButtonInactive: {
          borderColor: colors.borderLight,
          backgroundColor: colors.cardBackground,
        },
        genderText: {
          fontSize: 16,
          fontWeight: '600',
        },
      }),
    [colors]
  );

  const isFormValid = useMemo(() => {
    return name.trim() !== '' && type.trim() !== '' && weight.trim() !== '';
  }, [name, type, weight]);

  const handleSave = async () => {
    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const petData: CreatePetData = {
        name: name.trim(),
        type: type.trim(),
        breed: breed.trim() || 'Unknown',
        weight: parseFloat(weight) || 0,
        gender: gender,
        birthdate: birthdate || new Date().toISOString(),
      };

      await createPet(petData);

      Alert.alert(
        'Success',
        `${name} has been added successfully!`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to save pet';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Add New Pet"
        leftContent={<HeaderBackButton onPress={() => router.back()} />}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <ThemedText style={dynamicStyles.label}>Name *</ThemedText>
        <TextInput
          style={dynamicStyles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter pet name"
          placeholderTextColor={colors.textGray}
        />

        <ThemedText style={dynamicStyles.label}>Type *</ThemedText>
        <TextInput
          style={dynamicStyles.input}
          value={type}
          onChangeText={setType}
          placeholder="e.g., Dog, Cat"
          placeholderTextColor={colors.textGray}
        />

        <ThemedText style={dynamicStyles.label}>Breed</ThemedText>
        <TextInput
          style={dynamicStyles.input}
          value={breed}
          onChangeText={setBreed}
          placeholder="Enter breed"
          placeholderTextColor={colors.textGray}
        />

        <ThemedText style={dynamicStyles.label}>Weight (kg) *</ThemedText>
        <TextInput
          style={dynamicStyles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter weight"
          placeholderTextColor={colors.textGray}
          keyboardType="numeric"
        />

        <ThemedText style={dynamicStyles.label}>Gender</ThemedText>
        <View style={dynamicStyles.genderContainer}>
          <TouchableOpacity
            style={[
              dynamicStyles.genderButton,
              gender === 'male'
                ? dynamicStyles.genderButtonActive
                : dynamicStyles.genderButtonInactive,
            ]}
            onPress={() => setGender('male')}
          >
            <ThemedText
              style={[
                dynamicStyles.genderText,
                { color: gender === 'male' ? colors.primary : colors.text },
              ]}
            >
              Male
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              dynamicStyles.genderButton,
              gender === 'female'
                ? dynamicStyles.genderButtonActive
                : dynamicStyles.genderButtonInactive,
            ]}
            onPress={() => setGender('female')}
          >
            <ThemedText
              style={[
                dynamicStyles.genderText,
                { color: gender === 'female' ? colors.primary : colors.text },
              ]}
            >
              Female
            </ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={dynamicStyles.label}>Date of Birth</ThemedText>
        <TextInput
          style={dynamicStyles.input}
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textGray}
        />

        <TouchableOpacity
          style={[
            dynamicStyles.button,
            (!isFormValid || loading) && dynamicStyles.buttonDisabled,
          ]}
          onPress={handleSave}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ThemedText style={dynamicStyles.buttonText}>Save Pet</ThemedText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
});

