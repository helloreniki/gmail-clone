import axios from 'axios';
import { reactive } from 'vue';

// new Set outside of export: global state (updates in every component used)
// if inside of export: state available only to 1 component, it wont update in other components
let selected = reactive(new Set())

export const useEmailSelection = function(){
    // let selected = reactive(selectedSet)
    // selected.value
    let toggle = function(email) {
        if(selected.has(email)) {
            selected.delete(email)
        } else {
            selected.add(email)
        }
    }

    let selectAll = (allEmails) => {
        allEmails.forEach(email => {
            selected.add(email)
        })
    }

    let clear = () => {
        selected.clear()
    }

    let markRead = () => {
        selected.forEach(email => {
            email.read = true
            axios.put(`http://localhost:3000/emails/${email.id}`, email)
        })
    }

    let markUnread = () => {
        selected.forEach(email => {
            email.read = false
            axios.put(`http://localhost:3000/emails/${email.id}`, email)
        })
    }

    let archive = () => {
        selected.forEach(email => {
            email.archived = true
            axios.put(`http://localhost:3000/emails/${email.id}`, email)
        })
    }

    let moveToInbox = () => {
        selected.forEach(email => {
            email.archived = false
            axios.put(`http://localhost:3000/emails/${email.id}`, email)
        })
    }

  return {
    selected,
    toggle,
    selectAll,
    clear,
    markRead,
    markUnread,
    archive,
    moveToInbox
  }
}

export default useEmailSelection
