import asyncio
import os
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
import threading

# --- Завантажуємо змінні середовища ---
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
if not BOT_TOKEN:
    raise SystemExit("Помилка: BOT_TOKEN не знайдено в змінних оточення")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

# --- Telegram команди ---
@dp.message(Command("start"))
async def start(message: types.Message):
    await message.answer("Привіт! 👋 Я базовий Telegram-бот на aiogram 3. Токен захищено!")

@dp.message(Command("ping"))
async def ping(message: types.Message):
    await message.answer("Понг! 🏓 Бот працює ✔️")

@dp.message(Command("chatinfo"))
async def chatinfo(message: types.Message):
    chat = message.chat
    info = f"Chat ID: {chat.id}\nType: {chat.type}\nTitle: {chat.title if chat.title else 'N/A'}\nUsername: {chat.username if chat.username else 'N/A'}"
    await message.answer(info)

@dp.message()
async def echo(message: types.Message):
    await message.answer(f"Ти написав: {message.text}")

# --- FastAPI для Render ---
app = FastAPI()

@app.get("/")
async def root():
    return {"status": "Bot is running"}

def start_web_server():
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))

# --- Запуск ---
async def start_bot():
    await dp.start_polling(bot)

if __name__ == "__main__":
    # Запускаємо вебсервер у окремому потоці
    threading.Thread(target=start_web_server).start()
    # Запускаємо бота
    asyncio.run(start_bot())
