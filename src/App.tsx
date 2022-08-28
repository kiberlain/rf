import { useState, FormEvent } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { Document } from "../convex/_generated/dataModel";

const first_name = ['Железный','Пьяный','Внезапный','Ораньжевый','Синий','Твой','Звёздный','Термоядерный','Жопный','Стремительный','Другой','Православный','Добрый','Влюблённый','Загадочный','Будущий','Мрачный','Последний','Упоротый','Неблагодарный','Благородный','Злобный','Токсичный','Великолепный','Сбежавший','Ласковый','Волшебный','Неожиданный','Идеальный','Лучезарный','Красивый','Спящий','Молчаливый','Таинственный','Любвеобильный','Подозрительный','Суровый','Солнечный','Макаронный','Плохой','Пульсирующий','Конкретный','Туманный','Прозревший','Силиконовый','Лучший','Ненастоящий','Боевой','Блуждающий','Лысый','Озорной','Игривый','Резвый','Колбасный','Малиновый','Грозный','Уставший','Вчерашний','Неправильный','Грустный','Грешный','Ночной','Угарный','Офигевший','Умытый','Летучий','Адский','Небесный','Одинокий','Мокрый','Весёлый','Танцующий','Запретный','Золотой','Удивительный','Странный','Голодный','Романтичный']
const last_name = ['Балалай','Профессор','Архангел','Директор','Бомж','Волк','Шторм','Эклер','Гетеросексуал','Бабизяк','Соловей','Помидор','Кокос','Котик','Патриот','Мегатрон','Титан','Медведь','Соус','Угар','Боярин','Десант','Бобёр','Аромат','Поцелуй','Космонавт','Агент','Мурзик','Кукиш','Козинак','Батя','Принц','Ёжик','Конь','Телепуз','Бандит','Ганнибал','Доктор','Тазик','Капитан','Квас','Лучик','Карась','Мир','Кукумбер','Дракон','Пармезан','Арбуз','Хлебушек','Сухарик','Борщ','Пылесос','Песец','Персик','Камаз','Татарин','Гость','Электрик','Кабачок','Кукусик','Провокатор','Министр','Бамбук','Поезд','Любовник','Князь','Турмалин','Зефирчик','Грешник','Искуситель','Грузин','Господин','Царь','Бяк','Блинчик','Тигр','Трактор']

const nameGenerator = (first, last) => {
  let tempName = first[Math.floor(Math.random() * first.length)] + " " + last[Math.floor(Math.random() * last.length)]
  return tempName
}

console.log(nameGenerator(first_name, last_name))

nameGenerator(first_name, first_name);

const randomName = nameGenerator(first_name, last_name);

// Render a chat message.
function MessageView(props: { message: Document<"messages"> }) {
  const message = props.message;
  return (
    <div>
      <strong>{message.author}:</strong> {message.body}
    </div>
  );
}

export default function App() {
  // Dynamically update `messages` in response to the output of
  // `listMessages.ts`.
  const messages = useQuery("listMessages") || [];

  // Run `sendMessage.ts` as a mutation to record a chat message when
  // `handleSendMessage` triggered.
  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation("sendMessage");
  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    setNewMessageText(""); // reset text entry box
    await sendMessage(newMessageText, randomName);
  }
  return (
    <main className="py-4">
      <h1 className="text-center">Убежище</h1>
      <p className="text-center">
        <span className="badge bg-dark">{randomName}</span>
      </p>
      <ul className="list-group shadow-sm my-3">
        {messages.slice(-10).map((message: any) => (
          <li
            key={message._id}
            className="list-group-item d-flex justify-content-between"
          >
            <MessageView message={message} />
            <div className="ml-auto text-secondary text-nowrap">
              {new Date(message._creationTime).toLocaleTimeString()}
            </div>
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSendMessage}
        className="d-flex justify-content-center"
      >
        <input
          value={newMessageText}
          onChange={event => setNewMessageText(event.target.value)}
          className="form-control w-50"
          placeholder="Напиши что думаешь ^_^"
        />
        <input
          type="submit"
          value="Отправь сообщение"
          className="ms-2 btn btn-primary"
          disabled={!newMessageText}
        />
      </form>
    </main>
  );
}
