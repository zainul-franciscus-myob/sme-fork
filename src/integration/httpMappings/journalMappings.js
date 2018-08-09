import * as JournalIntents from '../../journal/JournalIntents';

export default {
  [JournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES]: {
    method: 'GET',
    path: '/journal/load_general_journal_entries'
  }
}
