import React, { useState, useEffect } from "react";

import db_cotas from "../../data/cotas.json";

import "./style.css";

export default _ => {

  const [content, setContent] = useState("");

  useEffect(_ => {
    setContent(render());
    const allCheckboxes = [...document.querySelectorAll("input[type=checkbox]")];
    if (allCheckboxes.every(checkbox => !checkbox.checked)) {
      document.getElementById("todos").checked = true;
    }
  }, []);

  function render(param) {
    const cotasJSON = db_cotas.reduce((accumulator, curr) => {
      if (!accumulator.some(obj =>
        obj.administradora === curr.administradora &&
        obj.tipo === curr.tipo &&
        obj.contemplacao === curr.contemplacao &&
        obj.valor_da_carta === curr.valor_da_carta &&
        obj.total_pago === curr.total_pago &&
        obj.divida_restante === curr.divida_restante &&
        obj.total_da_divida === curr.total_da_divida &&
        obj.valor_da_parcela === curr.valor_da_parcela &&
        obj.parcelas_devidas === curr.parcelas_devidas
      )) {
        accumulator.push(curr);
      }

      return accumulator;
    }, []).filter(cota => param ? cota.contemplacao === param : true);

    return cotasJSON.map(cota => {
      const date = new Date().toLocaleDateString("pt-BR");
      cota.upgrade = date;

      const { id, administradora, tipo, contemplacao, valor_da_carta, total_pago, divida_restante, total_da_divida, valor_da_parcela, parcelas_devidas, upgrade } = cota;

      function getContemplacao(contemplacao) {
        if (contemplacao === "contemplado") {
          return "Contemplado"
        } else if (contemplacao === "nao_contemplado") {
          return "Não Contemplado"
        } else {
          return "Cancelado";
        }
      }

      return (
        <div className="col-6 my-2" key={id}>
          <div className="card m-2">
            <div className="card-body">
              <h5><strong>Administradora:</strong> {administradora}</h5>
              <p><strong>Tipo:</strong> {tipo}</p>
              <p><strong>Contemplação:</strong> {getContemplacao(contemplacao)}</p>
              <p><strong>Valor da Carta:</strong> {toMoney(valor_da_carta)}</p>
              <p><strong>Total Pago:</strong> {toMoney(total_pago)}</p>
              <p><strong>Dívida Restante:</strong> {toMoney(divida_restante)}</p>
              <p><strong>Total da Dívida:</strong> {toMoney(total_da_divida)}</p>
              <p><strong>Valor da Parcela:</strong> {toMoney(valor_da_parcela)}</p>
              <p><strong>Parcelas Devidas:</strong> {toMoney(parcelas_devidas)}</p>
              <p><strong>Upgrade:</strong> {upgrade}</p>
            </div>
          </div>
        </div>
      );
    });
  }

  function verifyCheck(checkbox) {
    const allCheckboxes = [...document.querySelectorAll("input[type=checkbox]")];
    allCheckboxes.find(cb => cb.id !== checkbox.id ? cb.checked = false : "");

    if (allCheckboxes.every(checkbox => !checkbox.checked)) {
      document.getElementById("todos").checked = true;
      return setContent(render());
    }

    if (checkbox.checked && checkbox.id !== "todos") {
      setContent(render(checkbox.id));
    } else {
      setContent(render());
    }
  }

  function toMoney(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <div>
      <div id="filters">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input mx-2 pointer"
            type="checkbox"
            id="todos"
            value="Todos"
            onChange={e => verifyCheck(e.target)}
          />
          <label
            className="form-check-label pointer"
            htmlFor="todos">
            Listar Todos
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input mx-2 pointer"
            type="checkbox"
            id="contemplado"
            value="Contemplado"
            onChange={e => verifyCheck(e.target)}
          />
          <label
            className="form-check-label pointer"
            htmlFor="contemplado">
            Contemplado
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input mx-2 pointer"
            type="checkbox"
            id="nao_contemplado"
            value="Não Contemplado"
            onChange={e => verifyCheck(e.target)}
          />
          <label
            className="form-check-label pointer"
            htmlFor="nao_contemplado">
            Não Contemplado
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input mx-2 pointer"
            type="checkbox"
            id="cancelado"
            value="Cancelado"
            onChange={e => verifyCheck(e.target)}
          />
          <label
            className="form-check-label pointer"
            htmlFor="cancelado">
            Cancelado
          </label>
        </div>
      </div>

      <div className="row bg-light">{content}</div>
    </div>
  );
}
