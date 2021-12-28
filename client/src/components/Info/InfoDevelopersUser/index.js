import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


const InfoDevelopersUser = () => {
  return (
    <section>
      <p className="big_text">Сведения о разработчиках</p>
      <hr></hr>
      <p className="center">Самарский университет</p>
      <p className="center">Кафедра программных систем</p>
      <p className="center">Курсовой проект по дисциплине "Программная инженерия"</p>
      <p className="center">Тема проекта: «Автоматизированная система составления и разгадывания классического кроссворда по выбранной теме»</p>
      <p className="center">Разработчики (обучающиеся группы 6414-020302D)</p>
      <p className="center">Геращенкова Алина Сергеевна</p>
      <p className="center">Горшкова Татьяна Алексеевна</p>
      <p className="center">Прокофьева Ирина Алексеевна</p>
      <p className="center">Тарасова Виктория Николаевна</p>
      <p className="center">Самара 2021</p>
	  <Link to='systemU'>Сведения о системе</Link>

    </section>
  );
};

export { InfoDevelopersUser };