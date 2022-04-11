<script>

import { addDoc, collection, deleteDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { onDestroy } from 'svelte';
import { db } from './firestore'
import Toastify from 'toastify-js'

	let task = {
		title: '',
		description: '',
	}

	let tasks = []
	let editStatus = false
	let currentId = ''

	const addTask = async () => {
		try {
			await addDoc(collection(db, 'tasks'), {
				...task,
				createdAt: new Date()
			})
			Toastify({
  text: "New task created",
  duration: 3000,
  gravity: "bottom", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "green",
  },
  onClick: function(){} // Callback after click
}).showToast();
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = async () => {
	try {
		if (!editStatus) {
			addTask()
		} else {
			updateTask()
		}
		
	} catch (error) {
		console.log(error)
	}

	task = {
		title: '',
		description: '',
	}

	editStatus = false
	currentId = ''
	}

	const handleDelete = async (id) => {
		try {
		await deleteDoc(doc(db, 'tasks', id))
		Toastify({
  text: "Task deleted",
  duration: 3000,
  gravity: "bottom", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "red",
  },
  onClick: function(){} // Callback after click
}).showToast();
		
		} catch (error) {
			console.log(error)
		}
	}

	const handleEdit = currenTask => {
		task.title = currenTask.title
		task.description = currenTask.description
		currentId = currenTask.id
		editStatus = true
	}

	const updateTask = async () => {
		try {
			await updateDoc(doc(db, 'tasks', currentId), task) 
			Toastify({
  text: "Task updated",
  duration: 3000,
  gravity: "bottom", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "blue",
  },
  onClick: function(){} // Callback after click
}).showToast();
		} catch (error) {
			console.log(error)	
		}
	}


const unsub = onSnapshot(
		collection(db, 'tasks'),
		(querySnapshot) => {
		tasks = querySnapshot.docs.map(doc => {
				return {...doc.data(), id: doc.id}
			})
			console.log(tasks)
		}, 
		(err) => {
			console.log(err)
		}
	)

	onDestroy(unsub)
</script>

<main>
	<div class="container p-4">
		<div class="row">
			<div class="col-md-6">
				<form on:submit|preventDefault={handleSubmit} class="card card-body p-5">

					<div class="mb-3">
					<label for="title" class="text-secondary fs-5">Title:</label>
					<input bind:value={task.title} type="text" placeholder="Title" class="form-control">
					</div>
			
					<div class="mb-3">
					<label for="description" class="text-secondary fs-5">Description:</label>
					<textarea bind:value={task.description} id="description" rows="3"
					 placeholder="Description" class="form-control"></textarea>
			        </div>

					<div>
						<button class="btn btn-primary">Save</button>
					</div>
					
				</form>
			</div>
			<div class="col-md-6">
				{#each tasks as task}
				<div class="card card-body mt-2">
					<div class="d-flex justify-content-between">
					<h5>{task.title}</h5>
						<button>
							<i class="material-icons" on:click={handleEdit(task)}>edit</i>
						</button>
					
					</div>
					<p>{task.description}</p>
					<div>
						<button class="btn btn-danger" on:click={handleDelete(task.id)}>
							<i class="material-icons" style="vertical-align: middle;">delete_forever</i>
								Delete
						</button>
					</div>
				
				</div>
					
				{/each}
			</div>
		</div>
	
	

	</div>
</main>

<style>
	
</style>