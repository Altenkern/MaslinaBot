"""
Базовий Telegram-бот на aiogram 3.x, готовий для безкоштовного хостингу на Render.com.
Python 3.12–3.13.

Інструкція по запуску локально:
1. pip install aiogram==3.4.1
2. Вставити BOT_TOKEN
3. python bot.py

Інструкція по деплою на Render (безкоштовно):
- Створити GitHub репозиторій з цим файлом
- На Render → New Web Service → Deploy
- Стартова команда: python bot.py

"""

import asyncio
import os
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from dotenv import load_dotenv


# --- Завантажуємо змінні середовища ---
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
if not BOT_TOKEN:
raise SystemExit("Помилка: BOT_TOKEN не знайдено в змінних оточення")


bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


# --- Команда /start ---
@dp.message(Command("start"))
async def start(message: types.Message):
await message.answer("Привіт! 👋 Я базовий Telegram-бот на aiogram 3. Токен захищено!")


# --- Команда /ping ---
@dp.message(Command("ping"))
async def ping(message: types.Message):
await message.answer("Понг! 🏓 Бот працює ✔️")


# --- Ехо-режим ---
@dp.message()
async def echo(message: types.Message):
await message.answer(f"Ти написав: {message.text}")


# --- Запуск бота ---
async def main():
print("Бот запущено...")
await dp.start_polling(bot)


if __name__ == "__main__":
asyncio.run(main())