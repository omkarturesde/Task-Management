import toast from 'react-hot-toast';

export const useToast = () => {
  const success = (message: string) => {
    toast.success(message);
  };

  const error = (message: string) => {
    toast.error(message);
  };

  const loading = (message: string) => {
    return toast.loading(message);
  };

  const promise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  };

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  return {
    success,
    error,
    loading,
    promise,
    dismiss,
  };
};
