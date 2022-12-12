import axios from "axios";
import * as FileSystem from 'expo-file-system';

// Отправка фотографии на сервер
export const sendUserPhoto = async ( imageUrl: string ) => {
  const formData = new FormData();
  const file = await FileSystem.readAsStringAsync(imageUrl, { encoding: FileSystem.EncodingType.Base64 });
  formData.append("data[]", `data:image/jpeg;base64,${file}`);

  const requestUrl = 'https://cybernatedart-skin-disease-detection.hf.space/api/push'
  const request = await axios.post(requestUrl, {
    action: 'predict',
    data: [
      `data:image/jpeg;base64,${file}`
    ],
    fn_index: 0
  })

  return request;
}
