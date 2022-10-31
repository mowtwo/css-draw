export default async function readAsBase64(file: File) {
  return new Promise<string>(resolve => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', function () {
      resolve(fileReader.result!.toString())
    })
  })
}
