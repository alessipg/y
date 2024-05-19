document.addEventListener('DOMContentLoaded', (event) => {
    const redeSocial = {
        usuarios: [
            {
                username: 'gufixy'
            }
        ],
        posts: [
            {
                id: Date.now(),
                owner: 'Pedro',
                content: 'Primeiro post'
            },
            {
                id: Date.now(),
                owner: 'Pedro',
                content: 'Segundo post'
            }
        ],
        criarPost(dados, htmlOnly = false) {
            const idInterno = Date.now();
            if (!htmlOnly) {
                redeSocial.posts.push({
                    id: dados.id || idInterno,
                    owner: dados.owner,
                    content: dados.content
                });

            }
            const $listaPosts = document.querySelector('.listaPosts');
            $listaPosts.insertAdjacentHTML('afterbegin', `
            <div>
                <div class="user-container">
                    <li data-id="${idInterno}">
                        <img src="pedro.png" class="user">
                        <div class="usuario">
                            <h2 class="username">${dados.owner}</h2>
                        </div>
                        <button class="btn-delete">Delete</button>
                        <span contenteditable>
                        ${dados.content}
                        </span>
                    </li>
                </div>
            </div>
            `);
        },
        atualizarPost(id, texto) {

            const postagem = redeSocial.posts.find((post) => {
                return post.id === Number(id);
            });
            postagem.content = texto;
        },
        readPosts() {
            redeSocial.posts.forEach(({ id, owner, content }) => {
                redeSocial.criarPost({ id: id, owner: owner, content: content }, true);
            })
        },
        deletePost(id) {
            const listaPosts = redeSocial.posts.filter((postAtual) => {
                return postAtual.id !== Number(id);
            })
            console.log(listaPosts);
            redeSocial.posts = listaPosts;
            console.log(redeSocial.posts);
        }
    };
    //CRUD [READ]
    redeSocial.readPosts();

    const $form = document.querySelector('form');
    //CRUD [CREATE]
    $form.addEventListener('submit', function criaPostController(infosDoEvento) {
        infosDoEvento.preventDefault();
        const $input = document.querySelector('[name="criaPost"]');
        redeSocial.criarPost({ owner: 'gufixy', content: $input.value })
        $input.value = '';
    })
    //CRUD [DELETE]
    document.querySelector('.listaPosts').addEventListener('click', function (infosDoEvento) {
        const elementoAtual = infosDoEvento.target;
        const isBtnDeleteClick = infosDoEvento.target.classList.contains('btn-delete');
        if (isBtnDeleteClick) {
            const id = elementoAtual.parentNode.getAttribute('data-id');
            redeSocial.deletePost(id);
            elementoAtual.parentNode.parentNode.remove();

        }
    });
    //CRUD [UPDATE]
    document.querySelector('.listaPosts').addEventListener('input', function (infosDoEvento) {
        const elementoAtual = infosDoEvento.target;
        const id = elementoAtual.parentNode.getAttribute('data-id');
        redeSocial.atualizarPost(id, elementoAtual.innerText);

    });
});