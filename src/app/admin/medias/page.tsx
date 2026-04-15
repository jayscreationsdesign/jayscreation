'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  Trash2,
  Plus,
  RefreshCw,
  Image as ImageIcon,
  Upload,
  Grid,
  List,
  FolderOpen,
  Calendar,
  FileText
} from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  original_name: string;
  file_type: 'image' | 'video' | 'document' | 'other';
  mime_type: string;
  size: number;
  url: string;
  thumbnail_url?: string;
  alt_text?: string;
  folder?: string;
  created_at: string;
  updated_at: string;
}

export default function Medias() {
  const [medias, setMedias] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [folderFilter, setFolderFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  
  // Upload state
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [uploadFolder, setUploadFolder] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchMedias();
  }, []);

  const fetchMedias = async () => {
    try {
      const response = await fetch('/api/admin/medias');
      const data = await response.json();
      console.log('DEBUG MEDIAS TYPE', typeof data, Array.isArray(data), data);
      const safeMedias: MediaFile[] = Array.isArray(data) ? data : [];
      setMedias(safeMedias);
    } catch (error) {
      console.error('Erreur médias:', error);
      setMedias([]);
    } finally {
      setLoading(false);
    }
  };

  const safeMedias = Array.isArray(medias) ? medias : [];
  const filteredMedias = safeMedias.filter(media => {
    const matchesSearch = 
      media.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.original_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.alt_text?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || media.file_type === typeFilter;
    const matchesFolder = folderFilter === 'all' || media.folder === folderFilter;
    
    return matchesSearch && matchesType && matchesFolder;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!uploadFiles || uploadFiles.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simuler l'upload
      for (let i = 0; i < uploadFiles.length; i++) {
        setUploadProgress((i + 1) / uploadFiles.length * 100);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log('Upload terminé:', uploadFiles);
      setShowUploadModal(false);
      setUploadFiles(null);
      setUploadFolder('');
      setUploadProgress(0);
      fetchMedias();
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (media: MediaFile) => {
    setSelectedMedia(media);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMedia) return;
    
    try {
      console.log('Suppression média:', selectedMedia.id);
      setShowDeleteModal(false);
      setSelectedMedia(null);
      fetchMedias();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image': return ImageIcon;
      case 'video': return FileText;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const getUniqueFolders = () => {
    const folders = new Set(medias.map(m => m.folder).filter(Boolean));
    return Array.from(folders) as string[];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2C1A0E]">Médias</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Téléverser
          </button>
          <div className="flex bg-white border border-[#E8D5C0] rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#8B4513] text-white' : 'text-[#A0785A]'} transition-colors`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[#8B4513] text-white' : 'text-[#A0785A]'} transition-colors`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          >
            <option value="all">Tous les types</option>
            <option value="image">Images</option>
            <option value="video">Vidéos</option>
            <option value="document">Documents</option>
            <option value="other">Autres</option>
          </select>

          <select
            value={folderFilter}
            onChange={(e) => setFolderFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          >
            <option value="all">Tous les dossiers</option>
            {getUniqueFolders().map(folder => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
          </select>

          <button className="flex items-center px-4 py-2 border border-[#E8D5C0] rounded-lg hover:bg-[#F9F5F0] transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Médias */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredMedias.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun média trouvé</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6">
            {filteredMedias.map((media) => {
              const FileIcon = getFileIcon(media.file_type);
              return (
                <div key={media.id} className="group relative border border-[#E8D5C0] rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-[#F9F5F0] flex items-center justify-center">
                    {media.file_type === 'image' && media.thumbnail_url ? (
                      <img 
                        src={media.thumbnail_url} 
                        alt={media.alt_text || media.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileIcon className="w-12 h-12 text-[#A0785A]" />
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedMedia(media)}
                        className="p-2 bg-white rounded-full text-[#8B4513] hover:bg-[#F9F5F0] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(media)}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <p className="text-xs text-[#2C1A0E] truncate font-medium">{media.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(media.size)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-[#E8D5C0]">
            {filteredMedias.map((media) => {
              const FileIcon = getFileIcon(media.file_type);
              return (
                <div key={media.id} className="p-4 flex items-center justify-between hover:bg-[#F9F5F0] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#F9F5F0] rounded-lg flex items-center justify-center">
                      {media.file_type === 'image' && media.thumbnail_url ? (
                        <img 
                          src={media.thumbnail_url} 
                          alt={media.alt_text || media.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <FileIcon className="w-6 h-6 text-[#A0785A]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#2C1A0E]">{media.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(media.size)} - {media.mime_type}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(media.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedMedia(media)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(media)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal d'upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              Téléverser des fichiers
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Fichiers *
                </label>
                <div className="border-2 border-dashed border-[#E8D5C0] rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-[#A0785A]" />
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <p className="text-sm text-[#2C1A0E]">
                      Cliquez pour sélectionner ou glissez-déposez
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Images, vidéos, documents (max 10MB)
                    </p>
                  </label>
                </div>
                {uploadFiles && uploadFiles.length > 0 && (
                  <div className="text-sm text-[#2C1A0E]">
                    {uploadFiles.length} fichier(s) sélectionné(s)
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-1">
                  Dossier
                </label>
                <input
                  type="text"
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Nom du dossier (optionnel)"
                />
              </div>
              
              {isUploading && (
                <div>
                  <div className="flex justify-between text-sm text-[#A0785A] mb-1">
                    <span>Progression</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-[#E8D5C0] rounded-full h-2">
                    <div 
                      className="bg-[#8B4513] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFiles(null);
                  setUploadFolder('');
                  setUploadProgress(0);
                }}
                disabled={isUploading}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleUpload}
                disabled={!uploadFiles || uploadFiles.length === 0 || isUploading}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Téléversement...' : 'Téléverser'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualisation */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#2C1A0E]">{selectedMedia.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedMedia.size)} - {selectedMedia.mime_type}
                </p>
              </div>
              <button
                onClick={() => setSelectedMedia(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              {selectedMedia.file_type === 'image' ? (
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.alt_text || selectedMedia.name}
                  className="w-full max-h-96 object-contain bg-[#F9F5F0] rounded-lg"
                />
              ) : (
                <div className="w-full h-96 bg-[#F9F5F0] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    {(() => {
                      const FileIcon = getFileIcon(selectedMedia.file_type);
                      return <FileIcon className="w-16 h-16 text-[#A0785A] mx-auto mb-4" />;
                    })()}
                    <p className="text-[#2C1A0E]">Aperçu non disponible</p>
                    <a 
                      href={selectedMedia.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors mt-4"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-[#A0785A]">Nom original:</span>
                <p className="text-[#2C1A0E]">{selectedMedia.original_name}</p>
              </div>
              <div>
                <span className="font-medium text-[#A0785A]">Type MIME:</span>
                <p className="text-[#2C1A0E]">{selectedMedia.mime_type}</p>
              </div>
              <div>
                <span className="font-medium text-[#A0785A]">Dossier:</span>
                <p className="text-[#2C1A0E]">{selectedMedia.folder || 'Racine'}</p>
              </div>
              <div>
                <span className="font-medium text-[#A0785A]">Créé le:</span>
                <p className="text-[#2C1A0E]">
                  {new Date(selectedMedia.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedMedia(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={() => handleDelete(selectedMedia)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suppression */}
      {showDeleteModal && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
              Supprimer le média
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-700">
                Êtes-vous sûr de vouloir supprimer <strong>{selectedMedia.name}</strong> ?
              </p>
              <p className="text-sm text-red-600 mt-2">
                Cette action est irréversible.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedMedia(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
