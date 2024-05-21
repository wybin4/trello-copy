export const AppConstants = {
    FORBIDDEN: 'Доступ запрещен',
    UNAUTHORIZED: 'Пользователь неавторизован',
    BAD_REQUEST: (text: string) => `Неверные данные/${text} уже существует`
};