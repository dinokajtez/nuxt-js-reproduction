<script>
    import axios from 'axios';

    export const HTTP = axios.create({
        baseURL: 'http://vps431876.ovh.net:3000/api/'
    })
</script>
