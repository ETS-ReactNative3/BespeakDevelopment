import React, { Component } from "react";
import { 
    ActivityIndicator,
    FlatList,
    Text,
    View, 
    RefreshControl,
} from 'react-native';
import { db, _db } from '../firebase';

class OrganizerList extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            limit: 4,
            last_data: null,
            loading: true,
        }
    }
    componentDidMount() {
        try {
            this.setState({
                loading: true
            })
            this._loadOrganizers();
        } catch(error) {
            console.log(error);
        }
    }
    async _loadOrganizers() {
        console.log('Loading Organizers...')

       let query_res = await this._retrieveOrganizers();
        /*
        this.setState({
            data: query_res.data,
            last_data: query_res.last,
            loading: false
        });*/
    }
    async _retrieveOrganizers(type_extend = false) {

        let get_organizer_query = await db.collection('user_info');

        if(this.props.for_search && this.props.search_key) {
            let key = this.props.search_key;
            get_organizer_query = get_organizer_query
                .orderBy('f_name')
                .orderBy('org_name')
                .where('f_name', '>=', key)
                .where('f_name', '<', key + `z`)
                .where('org_name', '>=', key)
                .where('org_name', '<', key + `z`)
        }

        if(type_extend) {
            get_organizer_query = get_organizer_query
                .startAfter(this.state.last_data)
        }
        
        let documentSnapshots = await get_organizer_query
            .limit(this.state.limit)
            .get();
        let doc_data = [];

        documentSnapshots.forEach((doc) => {
            doc_data.push({id: doc.id, ...doc.data()})
        })
        
        console.log("Loaded Data: ", doc_data)
    }
    render() {
        return (
            <Text>Searching: {this.props.search_key}</Text>
        );
    }
}

export default React.memo(OrganizerList);