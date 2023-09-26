<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text" 
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text" 
                            v-model="user.email" required 
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-checkbox id="user-admin" v-show="mode === 'save'" 
                v-model="user.admin" class="mt-3 mb-3" >
                Administrador?
            </b-form-checkbox>

            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password" 
                            v-model="user.password" 
                            placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password" 
                            v-model="user.confirmPassword"
                            placeholder="Confirme a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar
                    </b-button>

                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir
                    </b-button>

                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>

        </b-form>

        <hr>

        <b-table hover striped :items="users" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>

                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'UserAdmin', // Define o nome do componente como "UserAdmin". Isso pode ser usado posteriormente para referenciar o componente em outras partes do código Vue.
    data: function() { // Esta é uma função que retorna um objeto. No Vue.js, o objeto retornado por esta função é usado para armazenar os dados do componente.
        return {
            mode: 'save', // Inicializa uma propriedade chamada 'mode' com o valor 'save'
            user: {}, // Inicializa uma propriedade chamada 'user' como um objeto vazio.
            users: [], // Inicializa uma propriedade chamada 'users' como um array vazio.
            fields: [ // Inicializa uma propriedade chamada 'fields' como um array de objetos. Cada objeto descreve uma coluna de uma tabela ou lista, usada para exibir dados relacionados a usuários
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },

    methods: {
        // Este código define uma função chamada loadUsers que faz uma solicitação HTTP GET para uma URL especificada e,
        // em seguida, atribui os dados da resposta à propriedade 'users' de um objeto Vue.js.
        loadUsers() { // Esta é uma função chamada 'loadUsers' que não aceita argumentos.
            const url = `${baseApiUrl}/users` // Declara uma constante urlque é construída concatenando a variável 'url' que é construída concatenando a variável 'baseApiUrl' com a String "/users". Isso presumidamente cria a URL para buscar dados de usuários de uma API
            axios.get(url).then(res => { // Faz uma solicitação HTTP GET para a URL especificada usando a biblioteca Axios. Quando a resposta é recebida com sucesso, o código dentro da função ''.then' é executado.
                this.users = res.data // Atribui os dados da resposta (acessados através de 'res.data') à propriedade 'users' do objeto Vue atual. Presumivelmente, esta propriedade 'users' é usada para armazenar os dados dos usuários recuperados da API.
            })
        },

        // Este código define uma função chamada 'reset' que parece ser parte de um componente Vue.js.
        reset() {
            this.mode = 'save' // Define a propriedade mode do objeto Vue atual como 'save'. Isso provavelmente indica que o componente está voltando ao modo de salvamento.
            this.user = {} // Define a propriedade 'user' do objeto Vue atual como um objeto vazio '{}'. Isso provavelmente significa que os dados do usuário estão sendo redefinidos para um estado vazio.
            this.loadUsers() // Chama a função 'loadUsers()'. Presumivelmente, esta função é responsável por carregar os dados dos usuários de alguma fonte (por exemplo, uma API) e atualizar a propriedade 'users' do objeto Vue com os dados carregados.
        },

        // é responsável por salvar ou atualizar dados de usuário em uma fonte de dados, como uma API.
        save() {
            const method = this.user.id ? 'put' : 'post' // Esta linha determina se a ação a ser executada é uma operação de criação (POST) ou uma operação de atualização (PUT) com base na existência da propriedade 'id' no objeto 'user'. Se o 'id' já estiver definido, a variável 'method' será definida como 'put', caso contrário, será definida como 'post'.
            const id = this.user.id ? `/${this.user.id}` : '' // Esta linha cria uma variável 'id' que contém o ID do usuário a ser atualizado, se estiver disponível. Se o 'id' do usuário estiver definido, será incluído na URL da solicitação, caso contrário, a string estará vazia.
            axios[method](`${baseApiUrl}/users${id}`, this.user) // Aqui, uma solicitação HTTP é feita usando a biblioteca Axios. O método da solicitação (POST ou PUT) é determinado pela variável 'method'. A URL da solicitação é construída usando a variável 'baseApiUrl', a string "/users", e a variável 'id' (se existir). O objeto 'this.user' é enviado como corpo da solicitação, contendo os dados do usuário a serem criados ou atualizados.
                .then(() => { // Define um tratamento de sucesso para a resposta da solicitação. Quando a solicitação for concluída com sucesso, o código dentro desta função anônima será executado.
                    this.$toasted.global.defaultSuccess() // Este código parece estar usando alguma funcionalidade de notificação ou feedback para informar ao usuário que a operação foi bem-sucedida. Pode ser um componente ou função personalizada para exibir uma mensagem de sucesso.
                    this.reset() // Chama a função 'reset()''. Presumivelmente, essa função foi definida anteriormente e é responsável por reverter o estado do componente a um estado inicial ou de "salvamento".
                })
                .catch(showError) // Define um tratamento de erro para a resposta da solicitação. Se a solicitação falhar, a função 'showError' será chamada para tratar o erro. A função 'showError' provavelmente lida com a exibição de mensagens de erro ou feedback ao usuário em caso de falha na operação.
        },

        // é  responsável por excluir um usuário de uma fonte de dados, como uma API.
        remove() {
            const id = this.user.id // Esta linha atribui o ID do usuário atualmente em foco (que está armazenado na propriedade 'id' do objeto 'user') à variável 'id'. Isso presumivelmente representa o ID do usuário que será excluído.
            axios.delete(`${baseApiUrl}/users/${id}`) // Aqui, uma solicitação HTTP DELETE é feita usando a biblioteca Axios. A URL da solicitação é construída usando a variável 'baseApiUrl', a string "/users", e o 'id' do usuário a ser excluído. Essa solicitação DELETE é usada para solicitar a exclusão do usuário correspondente na fonte de dados.
                .then(() => { // Define um tratamento de sucesso para a resposta da solicitação. Quando a solicitação for concluída com sucesso, o código dentro desta função anônima será executado.
                    this.$toasted.global.defaultSuccess() // Este código parece estar usando alguma funcionalidade de notificação ou feedback para informar ao usuário que a operação de exclusão foi bem-sucedida. Pode ser um componente ou função personalizada para exibir uma mensagem de sucesso.
                    this.reset() // Chama a função 'reset()'. Presumivelmente, essa função foi definida anteriormente e é responsável por reverter o estado do componente a um estado inicial ou de "salvamento".
                })
                .catch(showError) // Define um tratamento de erro para a resposta da solicitação. Se a solicitação falhar, a função 'showError' será chamada para tratar o erro. A função 'showError' provavelmente lida com a exibição de mensagens de erro ou feedback ao usuário em caso de falha na operação.
        },

        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    },

    //Esse código define um gancho de ciclo de vida Vue.js chamado mounted em um componente Vue. O gancho mounted é executado automaticamente após o componente ser inserido no DOM. No caso deste código, a função loadUsers() é chamada quando o componente é montado.
    mounted() {
        this.loadUsers() // Dentro do gancho 'mounted', a função 'loadUsers()' é chamada. Presumivelmente, essa função é responsável por carregar os dados dos usuários de alguma fonte (por exemplo, uma API) e atualizar a propriedade 'users' do objeto Vue com os dados carregados.
    }
}
</script>

<style>
</style>