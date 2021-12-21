import React from 'react';

import { Table, IconButton, TrashIcon } from 'evergreen-ui';

import './style.css';

const DictionaryTable = ({ words, setWords }) => {
  return words.length ? (
    <Table className='dictionary-table'>
      <Table.Head>
        <Table.TextHeaderCell>Понятие</Table.TextHeaderCell>
        <Table.TextHeaderCell>Определение</Table.TextHeaderCell>
        <Table.TextHeaderCell>Удалить</Table.TextHeaderCell>
      </Table.Head>

      <Table.VirtualBody className='virtual-body'>
        {words.map((wordToDelete) => (
          <Table.Row>
            <Table.TextCell>{wordToDelete}</Table.TextCell>
            <Table.TextCell>Определение</Table.TextCell>
            <Table.TextCell>
              <IconButton
                icon={TrashIcon}
                intent='danger'
                onClick={() =>
                  setWords(words.filter((word) => word !== wordToDelete))
                }
              />
            </Table.TextCell>
          </Table.Row>
        ))}
      </Table.VirtualBody>
    </Table>
  ) : (
    <p>Слова ещё не добавлены</p>
  );
};

export { DictionaryTable };
