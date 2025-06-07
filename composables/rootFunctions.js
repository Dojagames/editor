export function useFileNavigation() {
  const router = useRouter();
  function openFile(id) {
    router.push(`/own/canvas/${id}`);
  }

  return { openFile };
}
